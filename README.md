# sdk-js

## Install


```
<script>
      (function () {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://sdk-js.goshops.com/index.js';
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
      })();

    </script>
```js

## How to use it 

Start session

```
    gs.init('D_DGTRBQJBBRU',{debug: true});
```


```
    //re order items
    items = await gs.rank(items);
```

Send feedback

```
    gs.feedback('click',{
            item : "93363"
          })
```

Set User


```
    gs.setUser("user-id")
```

