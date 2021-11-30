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
                    this.props.endOfSaveFunction()
                }
                , 1000)
        })
    }

    render() {
        let saveButton = (<button className={this.props.className} 
                                  onClick={event => {
                                    this.setSaveMessages()
                                    this.props.onClick(event)
                            }}>Save</button>)
        if (this.state.savingMessage === 'Saving...') {
            saveButton = (<button className={this.props.classNameSaving}>Save</button>)
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