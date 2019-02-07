let getSingle = function( fn ){
  let result;
  return function(){
    return result || ( result = fn .apply(this, arguments ));
  }
};
//singleton


export const debounce = function(fn, delay) {
  let timer = null
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  }
}
