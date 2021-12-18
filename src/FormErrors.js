function FormErrors(props) {

    return props.showMessage && (           
        <div className="mt1 pl1 pr1">
            <span className="form-error-message">{props.message}</span>
        </div>
    )
}

export default FormErrors