import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { DateRange } from "react-date-range";
import { format, subDays } from "date-fns";
import { FilterContext } from "../../context/FilterContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const PRESETS = [
  { label: "Today", getRange: () => ({ startDate: new Date(), endDate: new Date() }) },
  { label: "Last 7 Days", getRange: () => ({ startDate: subDays(new Date(), 6), endDate: new Date() }) },
  { label: "Last 30 Days", getRange: () => ({ startDate: subDays(new Date(), 29), endDate: new Date() }) },
];

const normalizeDateRange = (dateRangeValue) => {
  if (
    dateRangeValue &&
    typeof dateRangeValue === "object" &&
    dateRangeValue.startDate &&
    dateRangeValue.endDate
  ) {
    return {
      startDate: new Date(dateRangeValue.startDate),
      endDate: new Date(dateRangeValue.endDate),
    };
  }

  return {
    startDate: subDays(new Date(), 6),
    endDate: new Date(),
  };
};

export default function DataRangePicker({ withGranularity = false, className = "" }) {
  const { filters = {}, setFilters } = useContext(FilterContext) || {};
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});

  const normalizedRange = useMemo(
    () => normalizeDateRange(filters?.dateRange),
    [filters?.dateRange]
  );

  const [state, setState] = useState([
    {
      startDate: normalizedRange.startDate,
      endDate: normalizedRange.endDate,
      key: "selection"
    }
  ]);

  useEffect(() => {
    setState([
      {
        startDate: normalizedRange.startDate,
        endDate: normalizedRange.endDate,
        key: "selection"
      }
    ]);
  }, [normalizedRange]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const updatePopupPosition = () => {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportPadding = 12;
      const maxAllowedWidth = Math.max(280, window.innerWidth - viewportPadding * 2);
      const desiredWidth = Math.min(380, maxAllowedWidth);

      let left = rect.left;
      if (left + desiredWidth > window.innerWidth - viewportPadding) {
        left = window.innerWidth - viewportPadding - desiredWidth;
      }
      if (left < viewportPadding) {
        left = viewportPadding;
      }

      const top = rect.bottom + 8;
      const maxHeight = Math.max(280, window.innerHeight - top - viewportPadding);

      setPopupStyle({
        position: "fixed",
        top: `${top}px`,
        left: `${left}px`,
        width: `${desiredWidth}px`,
        maxHeight: `${maxHeight}px`
      });
    };

    updatePopupPosition();
    window.addEventListener("resize", updatePopupPosition);
    window.addEventListener("scroll", updatePopupPosition, true);

    return () => {
      window.removeEventListener("resize", updatePopupPosition);
      window.removeEventListener("scroll", updatePopupPosition, true);
    };
  }, [isOpen]);

  const selectedRange = state[0];
  const rangeLabel = `${format(selectedRange.startDate, "dd MMM yyyy")} - ${format(
    selectedRange.endDate,
    "dd MMM yyyy"
  )}`;

  const updateRange = (range) => {
    setState([
      {
        ...range,
        key: "selection"
      }
    ]);

    if (setFilters) {
      setFilters((prev) => ({
        ...prev,
        dateRange: {
          startDate: range.startDate,
          endDate: range.endDate
        }
      }));
    }
  };

  return (
    <div ref={containerRef} className={`relative flex items-center gap-3 flex-wrap ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-lg border border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-200 shadow-sm hover:border-green-300 dark:hover:border-green-500 hover:shadow transition min-h-[44px]"
      >
        <CalendarDays className="h-4 w-4 text-green-600" />
        <span className="font-medium">{rangeLabel}</span>
        <ChevronDown className={`h-4 w-4 text-gray-500 dark:text-gray-300 transition ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {withGranularity && (
        <select
          value={filters?.timeGranularity || "Daily"}
          onChange={(e) =>
            setFilters?.((prev) => ({
              ...prev,
              timeGranularity: e.target.value
            }))
          }
          className="rounded-lg border border-green-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 shadow-sm hover:border-green-300 dark:hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500"
        >
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      )}

      {isOpen && (
        <div
          style={popupStyle}
          className="z-50 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 sm:p-3 shadow-2xl overflow-y-auto"
        >
          <div className="mb-3 flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => updateRange(preset.getRange())}
                className="rounded-md border border-gray-200 dark:border-gray-600 px-2.5 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-200 hover:border-green-300 dark:hover:border-green-500 hover:text-green-700 dark:hover:text-green-400"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <DateRange
              editableDateInputs
              onChange={(item) => updateRange(item.selection)}
              moveRangeOnFirstSelection={false}
              ranges={state}
              months={1}
              direction="horizontal"
              rangeColors={["#16a34a"]}
            />
          </div>
        </div>
      )}
    </div>
  );
}