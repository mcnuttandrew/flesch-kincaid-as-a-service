# Readability as a service

A simple Flask wrapper on the [textstat](https://github.com/shivam5992/textstat) readability package. You can visit a quick and dirty GUI at the link above, or you can access this library programmatically through the API.


## API

POST REQUST

URL: `https://readability-as-a-service.herokuapp.com/analyze?data="YOUR TEXT HERE"`

example:
`https://readability-as-a-service.herokuapp.com/analyze?data="Good Dogs wear sunglasses"`
Which returns

```json
{
    "automated-readability-index": 0,
    "coleman-liau-index": -15.81,
    "dale-chall-readability-score": 0,
    "difficult-words": 0,
    "flesch-kinkiad-grade": -15.7,
    "flesch-reading-ease": 206.84,
    "gunning-fog": 0,
    "linsear-write-formula": -1,
    "smog-index": 0,
    "text-standard": "-1th and 0th grade"
}
```
