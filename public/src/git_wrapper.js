import axios from 'axios';


const git_root = "https://api.github.com";

async function get_repos(username){
    let repos = await axios.get(git_root+"/users/"+username+"/repos");
    console.log(repos.data);
    return repos.data;

    // Todo: fetch all the repos of a given user
}

async function get_files_in_repo(repo, username){
    //Todo: list all the files in a given repo

    let files = await axios.get(git_root+"/repos/"+username+"/"+repo.name+"/git/trees/master?recursive=1");
    console.log(files);
    return files;

}

function list_file_types(files){
    let file_types = [];
    while( files.length > 0) {
        let file_type = files.pop().split(".");
        if (file_type.length > 1){
            file_types.push(file_type[1]);
        }
    }
    var counts = {};
    for (let i = 0; i < file_types.length; i++) {
        counts[file_types[i]] = 1 + (counts[file_types[i]] || 0);
    }
    console.log(counts);
    return counts


    // Todo: get the different filetypes and build an object

}

export async function build_language_percentages(username){

    let repos = await get_repos(username);
    let all_files = [];

    while (repos.length > 0){
        let repo = repos.pop();
        let repo_data = await get_files_in_repo(repo, username);
        let file_data = repo_data.data.tree;



        console.log(file_data);
        file_data.map(file => all_files.push(file.path));
    }
    return list_file_types(all_files);
}
list_file_types(["sebber.js", "morradi.py"]);
get_repos("zantiki");




