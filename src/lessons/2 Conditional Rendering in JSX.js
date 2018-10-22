console.log('App.js is running');

var app = {
    title: 'Indecision App',
    subtitle: 'Great app for making decisions easier',
    options: [
        'One',
        'Two'
    ]
};
var user = {
    name: 'Lukasz',
    age: 35,
    location: 'Lodz'
};

// We can use if statements inside templates, but its better to use function to make template more clear (logic is outside a template)
function getLocation(location) {
    if(location) {
        return location;
    } else {
        return 'Unknown';
    }
};

// we can also show/hide whole paragraph if value is defined/undefined:
function getAge(age){
    if(age){
        return <p>Age: {age}</p>; //we don't need "quotation marks" here
    }
};

// or we can use TURNERY OPERATOR inside template.

var template = (
    <div>
        <div>
            <h2>User: {user.name ? user.name : 'Anonymous'}</h2> {/* TURNERY OPERATOR */}

            <p>Location: {getLocation(user.location)}</p>
            {getAge(user.age)} {/* Show whole paragraph or display nothing at all if undefined */}
            
            {/* LOGICAL AND OPERATOR - check if user age is defined and if is equal minimum 18 */}
            { (user.age && user.age >= 18) && <p>This user is mature</p> } 
        </div>
        
        <h1>{app.title.toUpperCase()}</h1>
        {app.subtitle && <p>{app.subtitle}</p>} {/* if subtitle exist, show it in paragraph */}
        <p>User options: {(app.options && app.options.length >0) ? app.options.toString() : 'No options' } </p>
        {/*
        array.length - returns (or sets) the number of elements in an array.
        array.toString() - return a string with elements separated with commas.
         */}
    </div>
);

var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);