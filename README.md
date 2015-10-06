## react-month-calendar

![](http://dbachko.github.io/react-month-calendar/example/calendar.png)

Simple month calendar widget for React

## Usage

```
npm install
gulp
```

## Component API

`<Month>` component:

Property | Type | Default | Required | Description
-------- | ---- | ------- | -------- |-----------
date | Moment.js supported input types | yes | no | Default: current date
headerDateFormat | `Object` | yes | no | Structure: {m: 'MMM', y: 'YYYY'}. Moment.js date string format
firstDayOfWeek | `String` | yes | no | Day of the week ([0,6] with 0=Sunday)
onDayClick | `Function` | no | no | Accepts Moment.js date object

## License

See the [License](LICENSE) file.
