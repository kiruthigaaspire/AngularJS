describe('Controller: bookController', function () {

  // First, we load the app's module
  beforeEach(module('app.books'));

  // Then we create some variables we're going to use
  var bookController, scope;

  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {

    // Here, we create a mock scope variable, to replace the actual $scope variable
    // the controller would take as parameter
    scope = $rootScope.$new();

    // Then we create an $httpBackend instance. I'll talk about it below.
    httpMock = $httpBackend;

    // Here, we set the httpBackend standard reponse to the URL the controller is
    // supposed to retrieve from the API
    httpMock.expectPOST("http://localhost:800/angular/library_system/services/books.php?do=add").respond(
        {
            'name' : "test description",
            'author' : "test author",
            'code' : "test code",
            'no_of_books' : "100",
            'price' : "123.123",
            'description' : "books description"
        }
    );

    // Here, we actually initialize our controller, passing our new mock scope as parameter
    bookController = $controller('bookController', {
      $scope: scope
    });

    // Then we flush the httpBackend to resolve the fake http call
    httpMock.flush();

  }));


  // Now, for the actual test, let's check if the driversList is actually retrieving
  //  the mock driver array
  it('should return a list with two data', function () {
    expect(scope.length).toBe(2);
  });

  // Let's also make a second test checking if the drivers attributes match against
  // the expected values
  it('should retrieve the family names of the drivers', function () {
    expect(scope.message).toBe("Data Saved Successfully");
    expect(scope.message_type).toBe("success");
  });

});