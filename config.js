var config = {
	firebaseURL: "https://sms-sync-89b46.firebaseio.com"
};

exports.getFirebaseApp = function() {
	return config.firebaseURL;
}

