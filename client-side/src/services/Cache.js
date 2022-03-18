export const Cache = (function () {
  let instance;

  function createInstance() {
    return {
      planetList: [],
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();
