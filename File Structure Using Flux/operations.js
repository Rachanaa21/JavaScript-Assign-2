import data from './store.js';
import { isNameUnique } from './util.js';

function addItem(item) {
    const listItem = document.createElement("div");
    listItem.classList.add("item");

    const icon = document.createElement("span");
    icon.classList.add(`${item.type}-icon`);
    listItem.appendChild(icon);

    const itemName = document.createElement("span");
    itemName.textContent = item.name;
    listItem.appendChild(itemName);

    const buttonContainer = document.createElement("div");
    listItem.classList.add("button-container");
  
    if (item.type === "folder") {
        const expandButton = document.createElement("button");
        expandButton.setAttribute("id","btnId");
        expandButton.textContent = item.expanded ? "▼" : "▶";
        expandButton.addEventListener("click", () => {
            item.expanded = !item.expanded;
            renderFileExplorer();
        });
        listItem.appendChild(expandButton);

        const addFolder = document.createElement("button");
        addFolder.setAttribute("id","btnId");
        addFolder.textContent = "📁";
        addFolder.addEventListener("click", () => {
            const folderName = prompt("Enter folder name:");
            if (!folderName) {
                alert("Atleast one character required");
                return; 
            }
            while (!isNameUnique(folderName, item, null)) {
                alert("Same Folder Name Detected...\n Please try another Name");
                return;
            }
            let uniqueName = folderName;
            //let counter = 1;
           /*  while (!isNameUnique(uniqueName, item)) {
                uniqueName = `${folderName} (${counter})`;
                counter++;
            } */
            const newFolder = {
                name: uniqueName,
                type: "folder",
                expanded: true,
                children: []
            };
            item.children.push(newFolder);
            renderFileExplorer();
        });
        listItem.appendChild(addFolder);

        const addFile = document.createElement("button");
        addFile.setAttribute("id","btnId");
        addFile.textContent = "📄";
        addFile.addEventListener("click", () => {
            const fileName = prompt("Enter File name:");
            if (!fileName) {
                alert("Atleast one character required")
                return; 
            }
            while (!isNameUnique(fileName, item, null)) {
                alert("Same Folder Name Detected...\n Please try another Name");
                return;
            }
            let uniqueName = fileName;
            let counter = 1;
            while (!isNameUnique(uniqueName, item)) {
                uniqueName = `${fileName} (${counter})`;
                counter++;
            }
            const newFile = {
                name: uniqueName,
                type: "file"
            };
            item.children.push(newFile);
            renderFileExplorer();
        });
        listItem.appendChild(addFile);
    }

    const deleteFileFolder = document.createElement("button");
    deleteFileFolder.setAttribute("id","btnId");
    deleteFileFolder.textContent = "🗑️";
    deleteFileFolder.addEventListener("click", () => {
        const parentChildren = item.parent ? item.parent.children : data;
        const index = parentChildren.indexOf(item);
        if (index !== -1) {
            parentChildren.splice(index, 1);
            renderFileExplorer();
        }
    });
    listItem.appendChild(deleteFileFolder);
    return listItem;
}
function renderFileExplorer() {
    const fileExplorer = document.getElementById("file-structure");
    fileExplorer.innerHTML = '';

    const generateFolderStructure = (parent, items) => {
        const fileStructure = document.getElementById("file-structure");
    fileStructure.innerHTML = '';

    const createRootFolder = document.createElement("button");
    createRootFolder.textContent = "💻Root";
    createRootFolder.addEventListener("click", () => {
        let newFolderName = prompt("Enter Name:");
        if (!newFolderName) {
            alert("Atleast one character required");
            return; 
        }
        while (!isNameUnique(newFolderName, { children: data }, null)) {
            newFolderName = prompt("Same Folder Name Detected...\n Please try another Name");
            if (!newFolderName) {
                return; 
            }
        }
        const newFolder = {
            name: newFolderName,
            type: "folder",
            expanded: true,
            children: []
        };
        data.push(newFolder);
        renderFileExplorer();
    });
    fileExplorer.appendChild(createRootFolder);

        const childrenList = document.createElement("div");
        childrenList.classList.add("children-list");

        items.forEach(item => {
            item.parent = parent ? parent.itemData : null; 

            const listItem = addItem(item);
            listItem.itemData = item; 
            childrenList.appendChild(listItem);

            if (item.expanded && item.children.length > 0) {
                generateFolderStructure(listItem, item.children);
            }
        });
        parent.appendChild(childrenList);
    };
    generateFolderStructure(fileExplorer, data);
}
export { addItem, renderFileExplorer };
