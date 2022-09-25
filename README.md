# GoShops Discover SDK-JS

## Install

Add the following script into the `header` section of the HTML file.

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

### Auth & Init 

In order to use GoShops Discover API, add the token and optional parameters 

```
    gs.init('D_DGTRBQJBBRU',{debug: true});
```

### Recommendation APIs

#### Rank 

Assuming there is a product list the rank function will re-order the items based on the user taste, using this the product list is personalized per user.

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

#### Recommendation

Without providing a list, this function will perform the following tasks in order. 

1 - Retrive the top 100 items for this user using history data
2 - Rank the 100 items using recent feedback and context (category or search)

```
    // TODO
    const items = await gs.retriveAndRank();
```

#### Send feedback

Every action of the items showed in the Recommendations must be sent using the feedback function, this is super important to imrpove the rank recommendation. 

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

#### Set User

If there is auth, send the userId

```
    gs.setUser("user-id")
```


### Search 

#### Insta search 

Instasearch is usefull for auto complete list or fast typing searchs 

```
  const items = gs.instaSearch('blue dress')
```

Additional fields 

```
  const items = gs.instaSearch('blue dress', {
    filter : ["category = shirt", "proce < 100"]
    sort: ['price:asc']
  })
```

#### Full search 


#### Image search 


https://github.com/goshops-com/sdk-js/blob/main/test.html

