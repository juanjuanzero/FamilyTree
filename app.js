var xhr = new XMLHttpRequest(); //create a new XMLHttpRequest for the object.
//open a connection to the httpRequest
xhr.open('GET','https://rawgit.com/juanjuanzero/FamilyTree/master/data/family.json', true) //true because it is async which means no waiting.
xhr.send();

//we listen for when the state changes
xhr.addEventListener("readystatechange",processRequest, false);

function processRequest(e) {
    //check if the readystate is 4 and we got data (200)
    if(xhr.readyState==4 && xhr.status ==200){
        //process the request and parse it through JSON
        var response = JSON.parse(xhr.responseText);
        //alert(response.ip);
        //alert("Hello World");
        //alert(response.loc);

        //construct an array of objects
        var DS_array = [];
        var DS_edges = [];
        //var count = 0;
        // the response should return an array of Json objects.
        for( x in response ){
            //create objects
            var element = {id: response[x].ID, label: response[x].Decendant_Spouse};
            var connect = {from: response[x].Parent, to: response[x].ID};
            DS_array.push(element);
            DS_edges.push(connect)
            //count++;
        }

        // create an array with nodes
        var nodes = new vis.DataSet(
            //{id: 1, label: 'Node 1'},
            DS_array
        );

        // create an array with edges
        var edges = new vis.DataSet(
            //{from: 1, to: 3},
            DS_edges
        );

        // create a network
        var container = document.getElementById('mynetwork');

        // provide the data in the vis format
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {
            autoResize: true,
            height: '100%',
            width: '100%',

        };

        // initialize your network!
        var network = new vis.Network(container, data, options);
    }
}

