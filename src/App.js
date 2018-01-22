import React, {Component} from 'react';
import './App.css';
import axios from 'axios'

var paused = false;

class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <button className="clearAll" alt="logo" onClick={this.pause}>Pause</button>
                    <button className="clearAll" alt="logo" onClick={this.clearJobs}>Clear Complete Jobs</button>
                    <h1 className="App-title">JobQueue</h1>
                </header>
                <p className="App-intro">
                </p>
                <Table></Table>
            </div>
        );
    }

    clearJobs() {
        axios.delete('http://localhost:9000/jobs');
    }

    pause() {
        paused = !paused;
    }
}

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            displayForm: true,
            inputUser: '',
        };
        this.changeCard = this.changeCard.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    render() {
        this.gatherCards();

        var activeCards = [];
        var completeCards = [];

        try {

            var displayForm = this.state.displayForm ? (<Card key="add" toCreate="true" handler={this.changeCard}/>) : (
                <Card key="cardForm" formEnabled="true" userInput={this.state.inputUser}
                      textHandler={this.updateInputValue} handler={this.changeCard}/>);


            this.state.data.active.forEach(function (el) {
                var progress = Math.round(((new Date().getTime() - el.started_at)) / 1000);
                var dateCreated = new Date()
                dateCreated.setTime(parseInt(el.started_at))

                activeCards.push((<Card key={el.id} cardID={el.id} cardNumber={"card" + el.id}
                                        user={el.data.user}  progress={progress} dateCreated={dateCreated.toLocaleDateString()+"\n"+dateCreated.toTimeString()}
                />));
            });


            if(activeCards.length==0 && paused){
                paused=false;
            }

            if(!paused) {
                activeCards.push(displayForm);
            }

            const activeMap = activeCards.map((card) => (card))

            this.state.data.complete.forEach(function (el) {
                var dateCreated = new Date()
                dateCreated.setTime(parseInt(el.started_at))
                completeCards.push((<Card key={el.id} cardID={el.id} cardNumber={"card" + el.id}
                                          user={el.data.user}  dateCreated={dateCreated.toLocaleDateString()+"\n"+dateCreated.toTimeString()}
                />));
            });

            const completeMap = completeCards.map((card) => (card));

            var allTables = <div className='table'>
                <div className='tab'><h1>Active</h1></div>
                <div className='activeTable'>{activeMap}</div>
                <div className='tab'><h1>Complete</h1></div>
                <div className='completeTable'>{completeMap}</div>
            </div>

            if (completeMap || completeMap) {
                return allTables;
            } else {
                throw Error
            }
        } catch (e) {
            return <div></div>
        }
    }

    gatherCards() {

        var data = axios.get('http://localhost:9000/jobs').then(response => {
            this.setState({data: response.data});
        });
        return data;
    }

    changeCard() {
        if (this.state.displayForm) {
            this.state.displayForm = false;
        } else {
            this.state.displayForm = true;
            var data = axios.post('http://localhost:9000/jobs', {"user": this.state.inputUser})
        }
        this.state.inputUser='';

    }

    updateInputValue(evt) {
        this.state.inputUser = evt.target.value;
        return this.state.inputUser;
    }

}

class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputUser: '',
        };
    }

    render() {
        if (this.props.toCreate) {
            return (<div className='card'>
                <div className='card-content'>
                    <button onClick={this.props.handler}>Add</button>
                </div>
            </div>)
        }
        if (this.props.formEnabled) {
            return (<div className='card createJobs'>
                <div className='form-content'>
                    <div className='user'>
                        <label htmlFor='user'>User</label>
                        <input id='user' type='text' value={this.props.userInput}
                               onChange={evt => this.props.textHandler(evt)}/>
                    </div>
                    <div>
                        <input id='file' type='file'/>
                    </div>
                    <button onClick={this.props.handler}>Add</button>
                </div>

            </div>);
        } else {
            return (
                <div className='card'>
                    <div className='card-content'>
                        <div className='top-info'>
                            <div className='card-id'>
                                {this.leadingZeros(this.props.cardID)}
                            </div>
                            <div className='username'>
                                {this.props.user}
                            </div>
                            <div className='dateCreated'>
                                {this.props.dateCreated}
                            </div>
                        </div>
                        <h1 className={this.props.cardNumber}>{this.props.title}</h1>
                        <div className='progress-counter'>
                            {this.props.progress}
                        </div>
                    </div>
                </div>
            )
        }
    }

    leadingZeros(num) {
        num = num.toString();
        var len = num.length
        var result = '';
        for (var i = 0; i < 4 - len; i++) {
            result += 0;
        }
        result += num;

        return result;
    }
}

export default App;
