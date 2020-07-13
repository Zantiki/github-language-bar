function get_repos(username){
    // Todo: fetch all the repos of a given user
}

function get_files_in_repo(repo){
    //Todo: list all the files in a given repo

}

function list_file_types(files){
    while( files.length > 0) {
        let file_type = files.pop().split(".")[1]
        console.log(file_type)
    }
    // Todo: get the different filetypes and build an object

}

function build_language_percentages(username){

    let repos = get_repos(username);
    let files = [];
    repos.map(repo => {
       get_files_in_repo(repo).map(file => {
           console.log(file);
           files.push(file)
       });
    });

    return list_file_types(files);
}
list_file_types(["sebber.js", "morradi.py"])



