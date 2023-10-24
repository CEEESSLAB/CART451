//https://cycling74.com/articles/node-for-max-intro-%E2%80%93-let%E2%80%99s-get-started
//pull in library that allows for max communication
const maxApi = require("max-api");
//post to the max console -> then if you set up your max patch it will log there
//the object in max called node.debug also alows for console out
maxApi.post("hello from node");

//matching
maxApi.addHandler("example1", () => {

    maxApi.post("example1 function triggered");
	// When sending a result back from a handler, using maxApi.outlet, it's
	// common to include a selector as the first argument. This makes it
	// easier to route the message in Max.
	maxApi.outlet("example1");
});

maxApi.addHandler("example2", () => {

    maxApi.post("example2");
	// When sending a result back from a handler, using maxApi.outlet, it's
	// common to include a selector as the first argument. This makes it
	// easier to route the message in Max.
	maxApi.outlet("example2");
});


maxApi.addHandler("example3", () => {

    maxApi.post("example3");
	// When sending a result back from a handler, using maxApi.outlet, it's
	// common to include a selector as the first argument. This makes it
	// easier to route the message in Max.
	maxApi.outlet("example3");
});


// In order to accept a variable number of arguments, you can use the spread
// operator. This handler will accept messages like [sum 41], [sum 1 2 3] or
// even [sum 4 5 6 7 8 9 2 4 3 36]. It will return the sum of the remaining
// elements of the Max list.
maxApi.addHandler("sum", (...elements) => {
	// elements will be an array of the remaining elements of the list.
	let total = 0;
	for (let i = 0; i < elements.length; i++) {
		total = total + elements[i];
	}
    maxApi.post(total);

	//maxApi.outlet(total);
});

maxApi.addHandler("toggleVideo", () =>{
    maxApi.post("out");
    maxApi.outlet("toggle");


});
