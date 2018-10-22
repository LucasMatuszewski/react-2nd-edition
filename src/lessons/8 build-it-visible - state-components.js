class VisibleApp extends React.Component {
    constructor(props){
        super(props);
        this.handleVisibility = this.handleVisibility.bind(this);
        this.state = {
            visibility: false
        };
    }
    handleVisibility(){
        this.setState((prevState) => {
            return{
                visibility: !prevState.visibility
            };
        });
        console.log(this.state.visibility); // it returns previous (opposite) boolean value because of asynchronous work of setState
    }
    render(){
        return(
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.handleVisibility} >
                    {this.state.visibility ? 'Hide details' : 'Show details' }
                </button>
                { this.state.visibility && (
                    <p>something to hide</p>
                )}
            </div>
        );
    }
}

ReactDOM.render(<VisibleApp />, document.getElementById('app'));