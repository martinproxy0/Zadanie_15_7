class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewed: false
        };
        // Zmieniamy this metody handleOnClick...
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    handleOnClick(e) {
        // ...aby this używane w tym miejscu wskazywało na komponent.
        this.setState({loading: true});
    }

    // Arrow function zachowuje kontekst kodu, który go otacza - oznacza to, że this wewnątrz funkcji wskaże na… nasz komponent!
    handleOnClick = (e) => {
        this.setState( {loading: true} );
    }

    static defaultProps = {
        width: 400,
        height: 320
    }
    static propTypes = {
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
    }
    render() {
      return <img alt={this.props.caption} src={this.props.src} />;
      //Możemy również użyć atrybutu spread do rozprzestrzenienia właściwości na całym ReactElement zapisanym przy pomocy JSX
      return <img {...this.props}/>;
    }
  }