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
                                this.setState({savingMessage: ''},
                                    this.props.endOfSaveFunction
                                )
                            }, 1000
                        )
                    })
                }
                , 1000)
        })
    }

    render() {
        return (
            <div>
                <button className={this.props.className}

                        onClick={ event => {
                        this.setSaveMessages()
                        this.props.onClick(event)
                        } }

                        disabled={(this.state.savingMessage !== '') || this.props.disableButton}
                >Save</button>
                <span className="save-message">{this.state.savingMessage}</span>
            </div>
        )
    }
}

export default SaveButton;