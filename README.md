**Intro**

This project concerns a migration from the Hyperledger composer to the Hyperledger Fabric framework.

This is the bc-hc-m2 project (https://github.com/marciofk/bc-hc-m2).

This project is based on a working example of the documentation of Hyperledger fabric, fabcar. A small network is set up and a number of cars are exchanged to show the basic operation of the framework.

**Startup**

To get this project working there are a number of requirements that must be met. For example, Node.js Runtime, NPM, Go and more programs must be installed. (https://hyperledger-fabric.readthedocs.io/en/release-1.4/prereqs.html).

It is also advisable to use this project on an Apple Mac OS X device.

**The working**

First of all, there is a folder in the root folder called &quot;scripts&quot;, which contains bootstrap.sh, a script that should be used to download the correct files. There is also an import file with Postman http requests here, which can be loaded into POSTMAN.

The project consists of a number of separate components, the Hyperledger fabric network sets up a separate network called &quot;basic-network&quot;, after which it installs and implements the chain code (Javascript) with the CLI container. In order to start up this project it's enough to use the startFabric.sh script which is included in the /fabcar directory in the project root folder. This script sets up the needed components and implements the chaincode to the peer. Make sure that if you update the chaincode you have to increment the version number on the lines in startfabric.sh with the chaincode installation and instantation.  

There is also a small Node.js Express api present in the project. This can be started with &quot;node server.js&quot;. This small API provides communication between the client and the chain code on the peer. An example of these calls can be seen in the export of the postman requests.

When running, the couchdb statedb can be viewed on url; http://localhost:5984/_utils/

