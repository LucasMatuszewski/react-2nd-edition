class CounterApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);

        //renderApp() //in Components we don't have to re-render on data changes.
        //We use ***COMPONENT STATE***, and it takes care of re-rendering on data changes.
        // 1. We set a default state object with default values for this component
        // 2. Component rendered first time using this default state values
        // 3. Event changes a default state values
        // 4. Components re-rendered automatically using new state values
        this.state = { //component state object
            count: 0
        };
    }
    handleAddOne() {
        // 1. NEW (BETTER) WAY TO USE setState with callback function and prevState (from new version of React):
        this.setState((prevState) => { //setState = method to change a state. prevState = object with previous state
            return {
                count: prevState.count + 1 // if we have more states, we only use state we want to change
            };
        });
        console.log(this.state.count); // React State is asynchronous. Log is always one item behind.
        // Accessing this.state after calling setState returns the previous value, witch haven't been updated yet.
        // !!! NEVER mutate this.state directly! Treat this.state as if it were immutable.
        // https://blog.cloudboost.io/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e
    }
    handleMinusOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count - 1
            };
        });
    }
    handleReset() {
        // 2. OLD WAY TO USE setState, without function inside (could be deprecated in future):
        this.setState({ // it's simpler but don't give access to prevState. DON'T USE IT !!! even if you don't need prevState like here.
        // It cause problems for beginners, trying to use/change this.state directly, and surprised because of asynchronous work.
            count: 0
        });
    }
    render() {
        const app = {
            title: 'Counter App',
            subtitle: 'great app for counting'
        };
        // let count = 0; // WE USE COMPONENT STATE OBJECT FOR THIS!
        return(
            <div>
                <div>
                    <h1>{app.title}</h1>
                    <h2>{app.subtitle}</h2>
                    <h2>NUMBER: {this.state.count}</h2>
                </div>
                <div>
                    <button onClick={this.handleAddOne} >+1</button>
                    <button onClick={this.handleMinusOne} >-1</button>
                    <button onClick={this.handleReset} >reset</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<CounterApp />, document.getElementById('app'));