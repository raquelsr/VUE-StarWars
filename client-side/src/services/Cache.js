export const Cache = (function () {
  let instance;

  function createInstance() {
    return {};
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
