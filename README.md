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
```

## How to use it 

### Start

```
    gs.init('D_DGTRBQJBBRU',{debug: true});
```

### re-order a list of items - personalize product grid

```
    const items = [
          {
            "id": "72998"
          },
          {
            "id": "67197"
          },
          {
            "id": "77561"
          },
          {
            "id": "68358"
          },
          {
            "id": "79132"
          },
          {
            "id": "103228"
          },
          {
            "id": "72378"
          },
          {
            "id": "85131"
          },
          {
            "id": "94864"
          },
          {
            "id": "68791"
          },
          {
            "id": "93363"
          },
          {
            "id": "112623"
          }
    ]
    items = await gs.rank(items);
```

### recommended page

```
    // TODO
    const items = await gs.retriveAndRank();
```

### Send feedback

```
    gs.feedback('click',{
            item : "93363"
          })

    gs.feedback('like',{
            item : "93363"
          })

    gs.feedback('purchase',{
            item : "93363"
          })
```

### Set User

If there is auth, send the userId

```
    gs.setUser("user-id")
```


https://github.com/goshops-com/sdk-js/blob/main/test.html

