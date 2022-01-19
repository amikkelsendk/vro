/**
.SYNOPSIS
  Custom vRO SSH command - alternative to 'Run SSH Command' workflow
.DESCRIPTION
  Type:         Workflow
  Script:       JS
  Tested on:    vRO 8
.INPUTS
  strTargetHost (string)
  strSecurePassword (SecureString)
  strUsername (string)
  sshCommand (string)
.OUTPUTS
  cmdReturnCode (number)
  cmdStandardError (string)
  cmdStandardOutput (string)
.NOTES
  Website:        www.amikkelsen.com
  Author:         Anders Mikkelsen
  Creation Date:  2022-01-18
*/

var passwordAuthentication = true;
var session = null;
var port = 22;
var keyPath = null;

try {

	// Setup SSH session
	if (port == null) { port = 22 }
	session = new SSHSession(strTargetHost, strUsername, port);

	if (keyPath == null || keyPath == "") {
		System.log("Connecting with password");
	} else {
		System.log("Connecting with key pair (" + keyPath + ")");
		passwordAuthentication = False
	}

	session.connectWithPasswordOrIdentity(passwordAuthentication, strSecurePassword, keyPath);
	System.log("Connected!");

	//System.log("Executing '" + cmd + "' using encoding '" + (encoding ? encoding : "Default System Encoding") + "'");
	//session.setEncoding(encoding);

	// Execute configuration command.
	session.executeCommand(sshCommand, true);

	cmdStandardOutput = session.getOutput();
	cmdStandardError = session.getError();
	cmdReturnCode = session.exitCode;

	System.log("Output: '" + cmdStandardOutput + "'");
	System.log("Error: '" + cmdStandardError + "'");
	System.log("Exit code: '" + cmdReturnCode + "'");

} catch (e) {
	throw "Unable to execute command: " + e;
} finally {
	if (session) {
		session.disconnect();
	}
}
