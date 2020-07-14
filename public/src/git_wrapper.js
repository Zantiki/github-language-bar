import axios from 'axios';
import * as language_module from "./languages";

const git_root = "https://api.github.com";
const language_list = language_module.default;

async function get_repos(username){
    let repos = await axios.get(git_root+"/users/"+username+"/repos");
    return repos.data;

    // Todo: fetch all the repos of a given user
}

async function get_files_in_repo(repo, username){
    //Todo: list all the files in a given repo
    let files = await axios.get(git_root+"/repos/"+username+"/"+repo.name+"/git/trees/master?recursive=1");
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
    let language_counts = [];

    // Loop through all the different file extensions
    console.log(counts.length);
    for(let key in counts){
        if (!counts.hasOwnProperty(key)) {
            continue
        }
        let current_extension = key;
        for (let i = 0; i < language_list.length; i++){

            // Iterate through list of languages
            let current_language = language_list[i].name;
            let extension_types = language_list[i].extensions;
            if (!extension_types){
                continue
            }
            for(let y = 0; y < extension_types.length; y++){
                // Iterate through extension-types
                if(extension_types[y] === "."+current_extension){

                    language_counts.push([current_language, counts[current_extension]]) ;
                }
            }
        }
    }

    let init_count_length  = language_counts.length;
    let top_four = [];
    let sum = 0;
    let counter = 0;
    console.log(language_counts.length);
    while(counter < 4){
        let max_index = 0;
        for(let y = 0; y < language_counts.length; y++){
            if(language_counts[y][1] > language_counts[max_index][1] ){
                max_index = y
            }
        }
        top_four.push(language_counts[max_index]);
        if(language_counts[max_index] !== undefined){
            sum += language_counts[max_index][1];
        }
        language_counts.splice(max_index, 1);
        counter++;

    }
    let percentage_top = [];

    for(let i=0; i < top_four.length; i++){
        console.log(sum);
        console.log(top_four[i]);
        let value = top_four[i][1];
        let language = top_four[i][0];
        let percentage = value/sum;

        percentage_top.push([language, percentage])
    }
    console.log(percentage_top);
    return language_counts;

}

export async function build_language_percentages(username){

    let repos = await get_repos(username);
    let all_files = [];

    while (repos.length > 0){
        let repo = repos.pop();
        let repo_data = await get_files_in_repo(repo, username);
        let file_data = repo_data.data.tree;

        file_data.map(file => all_files.push(file.path));
    }
    return list_file_types(all_files);
}




