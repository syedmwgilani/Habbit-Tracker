import { Component } from "react"

class SaveButton extends Component {

    constructor(props) {
        super(props)

        this.state = {
            savingMessage: '',
        }
    }

    setSaveMessages() {

        this.setState({
            savingMessage: 'Saving...'
        }, () => {
            setTimeout(
                () => {
                    this.setState({
                        savingMessage: 'Habit Saved!'
                    }, () => {
                        setTimeout(
                            () => {
                                this.props.endOfSaveFunction()
                                this.setState({savingMessage: ''})
                            }, 1000
                        )
                    })
                }
                , 1000)
        })
    }

    render() {
        let saveButton = (<button className={this.props.className} 
                                  onClick={ event => {
                                    this.setSaveMessages()
                                    this.props.onClick(event)
                                  } }
                                  disabled={this.props.disableButton}
                            >Save</button>)
                            
        if (this.state.savingMessage !== '') {
            saveButton = (<button className={this.props.classNameSaving} 
                                  disabled={true}>Save</button>)
        }

        return (
            <div>
                {saveButton}
                <span className="save-message">{this.state.savingMessage}</span>
            </div>
        )
    }
}

export default SaveButton;