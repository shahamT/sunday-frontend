const componentMap = {
    // text: TextInput,
    // checkbox: CheckboxInput,
    // select: SelectInput,
};

function DynamicComponent({ type, ...rest }) {

    const Component = componentMap[type]

    if (!Component) return null 

    return (
        <div className="component-container">
            <Component {...rest} />
        </div>
    )
}


// example usage

/* <DynamicComponent
  type="text"
  label="Username"
  value={formData.username}
  onChange={handleChange}
/> */