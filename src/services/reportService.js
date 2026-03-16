export const downloadReport = () => {

  return new Promise((resolve, reject) => {

    const delay = Math.floor(Math.random() * 1000) + 1000;

    setTimeout(() => {

      const fail = Math.random() < 0.2;

      if (fail) {
        reject("Report generation failed");
      } else {
        resolve("Report downloaded");
      }

    }, delay);

  });

};