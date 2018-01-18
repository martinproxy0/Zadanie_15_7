class Stopwatch extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            laps: [],
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
    }

    reset() {
        if (!this.state.running){
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

    clear() {
        this.stop();
        this.setState({
            laps: []
        });
    }

    start() {
        if (!this.state.running) {
            this.setState({
                running: true
            });
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
    }
    
    calculate() {
        let { minutes, seconds, miliseconds } = this.state.times;

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
                miliseconds:miliseconds
            }
        });
    }

    stop() {
        this.state.running = false;
        clearInterval(this.watch);
    }

    format(times) {
        return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
    }

    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }

    lapTime() {
        if (this.state.running) {
            let time = this.format(this.state.times);
            this.setState(
                (prevState, props) => ({
                    laps: [...prevState.laps, {'time': time, 'id': new Date().getMilliseconds()}]
                })
            );
        }
    }

    render() {
        return (
            <div>
                <nav className="controls">
                    <a href="#" className="button btn btn-success" onClick={this.start.bind(this)}>Start</a>
                    <a href="#" className="button btn btn-primary" onClick={this.stop.bind(this)}>Stop</a>
                </nav>
                <div className="stopwatch">{this.format(this.state.times)}</div>
                <nav className="controls">
                    <a href="#" className="button btn btn-warning" onClick={this.lapTime.bind(this)}>Lap time</a>
                    <a href="#" className="button btn btn-danger" onClick={this.reset.bind(this)}>Reset</a>
                </nav>
                <ul className="results">
                    {this.state.laps.map((lap,index) =>
                        <li className="list-group-item list-group-item-dark" key={lap.id}>
                            Lap no. {index + 1} with time = {lap.time}
                        </li>)                                               
                    }
                </ul>
            </div>            
        );
    }

}

ReactDOM.render(
    <Stopwatch />,
    document.getElementById('app')
);