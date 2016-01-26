var ViewModel = function ViewModel() {
    var self = this;
    var bets = [];
    var username;
    var password;
    var users = [];
    var myDataRef = new Firebase('https://brazil2014.firebaseio.com/');
    var userDataRef = new Firebase('https://brazil2014.firebaseio.com/users');
    this.games = ko.observableArray([]);
    this.availableUsers = ko.observableArray([]),
    this.signUp = function signUp() {

        var user = {
            userName: $("#newUserName").val(),
            userPassword: $("#newPassword").val(),
            userEmail: $("#newEmail").val()
        };
        userDataRef.child($("#newUserName").val()).set(user);
        
        showhide();
        
        //new User($("#newUserName").val());
    },
    this.signIn = function signIn() {
        username = $("#newUserName").val();
        password = $("#newPassword").val();

        var users = self.availableUsers();
        for (var i = 0; i < users.length; i++) {
            if (users[i].userName === username && users[i].userPassword === password) {
                //alert("True");
                $.jStorage.set("loggedInUser", username);
                $("#saveHandicapping").show();
                $("#newUserName", "#newPassword", "#newEmail").val('');
                showhide();
                return;
            }
        }

        alert("False");
    },
    this.selectedUser = ko.observable(),
    this.saveHandicapping = function saveHandicapping() {
        //bets.length = 0;
        for (var gameIndex in self.games()) {
            var game = self.games()[gameIndex];
            bets.push({
                gameId: game.gameId,
                firstTeamScore: game.firstTeamScore(),
                secondTeamScore: game.secondTeamScore()
            });
        }
        var userName = self.selectedUser().userName;
        $.jStorage.set(self.selectedUser().userName, bets);
        myDataRef.child(userName).set(bets);
        bets = [];
    };
    

    this.showHandicapping = function showHandicapping() {
        var storageValues = $.jStorage.get(self.selectedUser().userName); //TODO: Get from DB
        //alert(storageValues);
        //if (storageValues === null) {
        //    alert("no data in storage")
        //}else{
        //    for (var gameIndex in self.games()) {
        //        this.games()[gameIndex].firstTeamScore(storageValues[gameIndex].firstTeamScore);
        //        this.games()[gameIndex].secondTeamScore(storageValues[gameIndex].secondTeamScore);
        //    };
        //}

        /*=== check here if the user selected in the dropDown is the same one the is login if yes show the save button if not  then hide it*/
        //alert("user login :" + self.selectedUser().userName);
        //alert("user password :" + username);
        if (self.selectedUser().userName === username) {
            $("#saveHandicapping").show();
            $("input").removeAttr('disabled');
        }
        else {
            $("#saveHandicapping").hide();
            $("input[type='number']").attr('disabled', 'disabled');
        }


        var dataRef = new Firebase('https://brazil2014.firebaseio.com/' + self.selectedUser().userName);
        dataRef.on('value', function (snapshot) {
            for (var gameIndex in self.games()) {
                self.games()[gameIndex].firstTeamScore(snapshot.val()[gameIndex].firstTeamScore);
                self.games()[gameIndex].secondTeamScore(snapshot.val()[gameIndex].secondTeamScore);
            };
        });
    }

    this.clearHandicapping = function clearHandicapping() {
        //$.jStorage.flush();
    }

    this.getUsers = function getUsers() {

        userDataRef.on('value', function (snapshot) {
            var usersObj = snapshot.val();
            for (var userKey in usersObj) {
                var userVal = usersObj[userKey];
                self.availableUsers.push(userVal);
            }
        });

        //this.availableUsers(
        //    [
	    //        { userName: 'Kobi', userEmail: 'Kobimmm@gmail.com', userPassword: 'pass1601' },
        //        { userName: 'Tal', userEmail: 'talbm@gmail.com', userPassword: 'passtal' },
        //        { userName: 'Avihai', userEmail: 'avihai@seeit.co.il', userPassword: 'pass1234' },
        //        { userName: 'Peled', userEmail: 'peled@gmail.com', userPassword: 'pass1234' },
        //        { userName: 'Nissim', userEmail: 'nissim@gmail.com', userPassword: 'pass1234' },
        //        { userName: 'Ariel', userEmail: 'ariel@gmail.com', userPassword: 'pass1234' }
        //    ]
        //);
    };

    this.getUsers();

    this.getGames = function getGames() {

        //$.getJSON("data/games.json").done(function (data) {
        //    if (data) {
        //        games(data);
        //    }
        //});

        this.games([
	        { gameId: '1', firstTeamLabel: 'BRA', secondTeamLabel: 'CRO', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Brazil.png', secondTeamFlag: 'images/Flags/medium/Croatia.png' },
            { gameId: '2', firstTeamLabel: 'MEX', secondTeamLabel: 'CAM', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Mexico.png', secondTeamFlag: 'images/Flags/medium/Cameroon.png' },
            { gameId: '3', firstTeamLabel: 'SPA', secondTeamLabel: 'NET', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Spain.png', secondTeamFlag: 'images/Flags/medium/Netherlands.png' },
            { gameId: '4', firstTeamLabel: 'CHI', secondTeamLabel: 'AUS', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Chile.png', secondTeamFlag: 'images/Flags/medium/Australia.png' },
            { gameId: '5', firstTeamLabel: 'COL', secondTeamLabel: 'GRE', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Colombia.png', secondTeamFlag: 'images/Flags/medium/Greece.png' },
            { gameId: '6', firstTeamLabel: 'URU', secondTeamLabel: 'COS', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Uruguay.png', secondTeamFlag: 'images/Flags/medium/Costa-Rica.png' },
            { gameId: '7', firstTeamLabel: 'ENG', secondTeamLabel: 'ITA', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/England.png', secondTeamFlag: 'images/Flags/medium/Italy.png' },
            { gameId: '8', firstTeamLabel: 'COT', secondTeamLabel: 'JAP', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Cote-d\'Ivory.png', secondTeamFlag: 'images/Flags/medium/Japan.png' },
            { gameId: '9', firstTeamLabel: 'MEX', secondTeamLabel: 'CAM', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Mexico.png', secondTeamFlag: 'images/Flags/medium/Cameroon.png' },
            { gameId: '10', firstTeamLabel: 'SPA', secondTeamLabel: 'NET', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Spain.png', secondTeamFlag: 'images/Flags/medium/Netherlands.png' },
            { gameId: '11', firstTeamLabel: 'CHI', secondTeamLabel: 'AUS', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Chile.png', secondTeamFlag: 'images/Flags/medium/Australia.png' },
            { gameId: '12', firstTeamLabel: 'MEX', secondTeamLabel: 'CAM', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Mexico.png', secondTeamFlag: 'images/Flags/medium/Cameroon.png' },
            { gameId: '13', firstTeamLabel: 'SPA', secondTeamLabel: 'NET', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Spain.png', secondTeamFlag: 'images/Flags/medium/Netherlands.png' },
            { gameId: '14', firstTeamLabel: 'CHI', secondTeamLabel: 'AUS', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Chile.png', secondTeamFlag: 'images/Flags/medium/Australia.png' },
            { gameId: '15', firstTeamLabel: 'MEX', secondTeamLabel: 'CAM', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Mexico.png', secondTeamFlag: 'images/Flags/medium/Cameroon.png' },
            { gameId: '16', firstTeamLabel: 'SPA', secondTeamLabel: 'NET', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Spain.png', secondTeamFlag: 'images/Flags/medium/Netherlands.png' },
            { gameId: '17', firstTeamLabel: 'CHI', secondTeamLabel: 'AUS', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Chile.png', secondTeamFlag: 'images/Flags/medium/Australia.png' },
            { gameId: '18', firstTeamLabel: 'MEX', secondTeamLabel: 'CAM', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Mexico.png', secondTeamFlag: 'images/Flags/medium/Cameroon.png' },
            { gameId: '19', firstTeamLabel: 'SPA', secondTeamLabel: 'NET', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Spain.png', secondTeamFlag: 'images/Flags/medium/Netherlands.png' },
            { gameId: '20', firstTeamLabel: 'CHI', secondTeamLabel: 'AUS', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Chile.png', secondTeamFlag: 'images/Flags/medium/Australia.png' },
            { gameId: '21', firstTeamLabel: 'MEX', secondTeamLabel: 'CAM', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Mexico.png', secondTeamFlag: 'images/Flags/medium/Cameroon.png' },
            { gameId: '22', firstTeamLabel: 'SPA', secondTeamLabel: 'NET', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Spain.png', secondTeamFlag: 'images/Flags/medium/Netherlands.png' },
            { gameId: '23', firstTeamLabel: 'CHI', secondTeamLabel: 'AUS', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Chile.png', secondTeamFlag: 'images/Flags/medium/Australia.png' },
            { gameId: '24', firstTeamLabel: 'MEX', secondTeamLabel: 'CAM', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Mexico.png', secondTeamFlag: 'images/Flags/medium/Cameroon.png' },
            { gameId: '25', firstTeamLabel: 'SPA', secondTeamLabel: 'NET', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Spain.png', secondTeamFlag: 'images/Flags/medium/Netherlands.png' },
            { gameId: '26', firstTeamLabel: 'CHI', secondTeamLabel: 'AUS', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Chile.png', secondTeamFlag: 'images/Flags/medium/Australia.png' },
            { gameId: '27', firstTeamLabel: 'MEX', secondTeamLabel: 'CAM', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Mexico.png', secondTeamFlag: 'images/Flags/medium/Cameroon.png' },
            { gameId: '28', firstTeamLabel: 'SPA', secondTeamLabel: 'NET', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Spain.png', secondTeamFlag: 'images/Flags/medium/Netherlands.png' },
            { gameId: '29', firstTeamLabel: 'CHI', secondTeamLabel: 'AUS', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Chile.png', secondTeamFlag: 'images/Flags/medium/Australia.png' },
            { gameId: '30', firstTeamLabel: 'MEX', secondTeamLabel: 'CAM', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Mexico.png', secondTeamFlag: 'images/Flags/medium/Cameroon.png' },
            { gameId: '31', firstTeamLabel: 'SPA', secondTeamLabel: 'NET', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Spain.png', secondTeamFlag: 'images/Flags/medium/Netherlands.png' },
            { gameId: '32', firstTeamLabel: 'CHI', secondTeamLabel: 'AUS', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Chile.png', secondTeamFlag: 'images/Flags/medium/Australia.png' },
            { gameId: '33', firstTeamLabel: 'COL', secondTeamLabel: 'GRE', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Colombia.png', secondTeamFlag: 'images/Flags/medium/Honduras.png' },
            { gameId: '34', firstTeamLabel: 'URU', secondTeamLabel: 'COS', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Uruguay.png', secondTeamFlag: 'images/Flags/medium/Costa-Rica.png' },
            { gameId: '35', firstTeamLabel: 'ENG', secondTeamLabel: 'ITA', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/England.png', secondTeamFlag: 'images/Flags/medium/Italy.png' },
            { gameId: '36', firstTeamLabel: 'COT', secondTeamLabel: 'JAP', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Cote-d\'Ivory.png', secondTeamFlag: 'images/Flags/medium/Japan.png' },
            { gameId: '37', firstTeamLabel: 'COL', secondTeamLabel: 'GRE', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Colombia.png', secondTeamFlag: 'images/Flags/medium/Honduras.png' },
            { gameId: '38', firstTeamLabel: 'URU', secondTeamLabel: 'COS', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Uruguay.png', secondTeamFlag: 'images/Flags/medium/Costa-Rica.png' },
            { gameId: '39', firstTeamLabel: 'ENG', secondTeamLabel: 'ITA', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/England.png', secondTeamFlag: 'images/Flags/medium/Italy.png' },
            { gameId: '40', firstTeamLabel: 'COT', secondTeamLabel: 'JAP', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Cote-d\'Ivory.png', secondTeamFlag: 'images/Flags/medium/Japan.png' },
            { gameId: '41', firstTeamLabel: 'COL', secondTeamLabel: 'GRE', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Colombia.png', secondTeamFlag: 'images/Flags/medium/Honduras.png' },
            { gameId: '42', firstTeamLabel: 'URU', secondTeamLabel: 'COS', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Uruguay.png', secondTeamFlag: 'images/Flags/medium/Costa-Rica.png' },
            { gameId: '43', firstTeamLabel: 'ENG', secondTeamLabel: 'ITA', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/England.png', secondTeamFlag: 'images/Flags/medium/Italy.png' },
            { gameId: '44', firstTeamLabel: 'COT', secondTeamLabel: 'JAP', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Cote-d\'Ivory.png', secondTeamFlag: 'images/Flags/medium/Japan.png' },
            { gameId: '45', firstTeamLabel: 'COL', secondTeamLabel: 'GRE', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Colombia.png', secondTeamFlag: 'images/Flags/medium/Honduras.png' },
            { gameId: '45', firstTeamLabel: 'URU', secondTeamLabel: 'COS', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Uruguay.png', secondTeamFlag: 'images/Flags/medium/Costa-Rica.png' },
            { gameId: '47', firstTeamLabel: 'ENG', secondTeamLabel: 'ITA', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/England.png', secondTeamFlag: 'images/Flags/medium/Italy.png' },
            { gameId: '48', firstTeamLabel: 'COT', secondTeamLabel: 'JAP', firstTeamScore: ko.observable("0"), secondTeamScore: ko.observable("0"), firstTeamFlag: 'images/Flags/medium/Cote-d\'Ivory.png', secondTeamFlag: 'images/Flags/medium/Japan.png' },
        ]);
    };

    this.getGames();
};

User = function (name, email, password) {
    this.userName = name;
    this.userEmail = email;
    this.userPassword = password;
};


ko.applyBindings(new ViewModel());
