'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

        _this.state = {
            running: false,
            laps: [],
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            if (!this.state.running) {
                this.setState({
                    times: {
                        minutes: 0,
                        seconds: 0,
                        miliseconds: 0
                    }
                });
                this.clear();
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.stop();
            this.setState({
                laps: []
            });
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.setState({
                    running: true
                });
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            var _state$times = this.state.times,
                minutes = _state$times.minutes,
                seconds = _state$times.seconds,
                miliseconds = _state$times.miliseconds;


            miliseconds += 1;
            if (miliseconds >= 100) {
                seconds += 1;
                miliseconds = 0;
            }
            if (seconds >= 60) {
                minutes += 1;
                seconds = 0;
            }
            this.setState({
                times: {
                    minutes: minutes,
                    seconds: seconds,
                    miliseconds: miliseconds
                }
            });
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.state.running = false;
            clearInterval(this.watch);
        }
    }, {
        key: 'format',
        value: function format(times) {
            return this.pad0(this.state.times.minutes) + ':' + this.pad0(this.state.times.seconds) + ':' + this.pad0(Math.floor(this.state.times.miliseconds));
        }
    }, {
        key: 'pad0',
        value: function pad0(value) {
            var result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
        }
    }, {
        key: 'lapTime',
        value: function lapTime() {
            if (this.state.running) {
                var time = this.format(this.state.times);
                this.setState(function (prevState, props) {
                    return {
                        laps: [].concat(_toConsumableArray(prevState.laps), [{ 'time': time, 'id': new Date().getMilliseconds() }])
                    };
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'nav',
                    { className: 'controls' },
                    React.createElement(
                        'a',
                        { href: '#', className: 'button btn btn-success', onClick: this.start.bind(this) },
                        'Start'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button btn btn-primary', onClick: this.stop.bind(this) },
                        'Stop'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'stopwatch' },
                    this.format(this.state.times)
                ),
                React.createElement(
                    'nav',
                    { className: 'controls' },
                    React.createElement(
                        'a',
                        { href: '#', className: 'button btn btn-warning', onClick: this.lapTime.bind(this) },
                        'Lap time'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button btn btn-danger', onClick: this.reset.bind(this) },
                        'Reset'
                    )
                ),
                React.createElement(
                    'ul',
                    { className: 'results' },
                    this.state.laps.map(function (lap, index) {
                        return React.createElement(
                            'li',
                            { className: 'list-group-item list-group-item-dark', key: lap.id },
                            'Lap no. ',
                            index + 1,
                            ' with time = ',
                            lap.time
                        );
                    })
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));
