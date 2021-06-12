JSON to Google Sheets Importer is an online tool to create Google Sheets from
data supplied as a JSON array to the form online at
https://jsonworkspace.appspot.com/

Each JSON array entry is converted to a row in a new Google Sheet, with the
dictionary keys converted to column names.

For example:

```json
[
  {
    "first name": "John",
    "last name": "Lennon",
    "birth year": 1940
  },
  {
    "first name": "Paul",
    "last name": "McCartney",
    "birth year": 1942
  },
  {
    "first name": "George",
    "last name": "Harrison",
    "birth year": 1943
  },
  {
    "first name": "Ringo",
    "last name": "Starr",
    "birth year": 1940
  }
]
```

.. would be converted to a Google Sheet formatted like this:

first name | last name | birth year
---------- | --------- | ----------
John       | Lennon    | 1940
Paul       | McCartney | 1942
George     | Harrison  | 1943
Ringo      | Starr     | 1940

Number and string types are used where appropriate.

Where keys are not defined in some array entries, empty cells will be created in
corresponding rows.

Data is arranged into a two-dimensional grid format by flattening any nested
dictionaries or arrays. For example:

```json
[
  {
    "Name": "France",
    "Capital": {
      "Name": "Paris",
      "Population": 2175000
    },
    "Exports": [
      "Machinery", "Vehicles", "Electricals"
    ]
  },
  {
    "Name": "United Kingdom",
    "Capital": {
      "Name": "London",
      "Population": 9304000
    },
    "Exports": [
      "Machinery", "Gems", "Vehicles"
    ]
  }
]
```

becomes

Name           | Capital.Name | Capital.Population | Exports\[0\] | Exports\[1\] | Exports\[2\]
-------------- | ------------ | ------------------ | ------------ | ------------ | ------------
France         | Paris        | 2175000            | Machinery    | Vehicles     | Electricals
United Kingdom | London       | 9304000            | Machinery    | Gems         | Vehicles

The tool requires the user to have a Google account, and the user must grant
permission for the application to use the account to access the Google Sheets
API.

Permission will be requested when Import is pressed, and a new private
spreadsheet will be created with the user as the owner.

The website application was developed by jimblackler@gmail.com and offered under
an [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0).
