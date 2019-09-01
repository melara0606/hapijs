function home(request, h) {
  return h.view('index', {
    title: 'Home'
  })
}

module.exports = {
  home: home
};
