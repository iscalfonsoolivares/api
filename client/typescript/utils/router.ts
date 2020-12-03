export const router = {
  _routes: {},
  add: function( pathName: string, action: () => void ){
      this._routes[pathName] = action;
  },
  run: function(){
      const keys: string[] = Object.keys(this._routes)
      keys.forEach( route => {
          const url = new URL( location.href );
          if (url.pathname === route) this._routes[route]();
      })
  }
}
