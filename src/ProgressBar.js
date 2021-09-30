import React, { Component } from 'react'

const InnerBar = (props) => {
    const divStyle = {
        width: props.size,
    }

    return (
        <div className="bg-blue white" style={divStyle} > {props.size} </div>
    )
}

class ProgressBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            progress: 0,
            full: 100
        }
    }

    incrementPercent() {
        this.setState({
            progress: this.state.progress + 10
        })
    }

    render() {
        const { progress } = this.state
        const progPercent = progress + '%'

        return (
            <main className="documentation">
                <section className="flex five">
                <aside className="full four-fifth-1000">
                    <div className="bg-light-gray">
                        <InnerBar size={progPercent} />
                    </div>
                    <br />
                    <button onClick={this.incrementPercent.bind(this)}> Click Me </button>
                </aside>
                </section>
            </main>
        )
    }
}

export default ProgressBar