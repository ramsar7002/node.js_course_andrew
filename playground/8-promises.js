const helperFunction = () => {
  const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve([1, 4, 7]);
      reject("Things went wrong");
    }, 2000);
  });
  return doWorkPromise;
};

const dos = async () => {
  try {
    const res = await helperFunction();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

dos();
