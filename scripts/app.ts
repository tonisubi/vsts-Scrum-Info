///<reference types="vss-web-extension-sdk" />

import { MessageHelper } from "./logic/messageHelper";
import { WorkItemCalculations } from "./logic/workItemCalculations";
import Dialogs = require("VSS/Controls/Dialogs");

var actionProvider = {
    getMenuItems: (context) => {
        return [<IContributedMenuItem>{
            title: "Scrum Info",
            action: (actionContext) => {
                // Get the list of selected items on the backlog
                let workitemidlist = [];
                for (var id in actionContext.workItemIds) {
                    workitemidlist.push(actionContext.workItemIds[id]);
                }

                // REST query dependencies
                VSS.require(["VSS/Service", "TFS/WorkItemTracking/RestClient"], function (VSS_Service, TFS_Wit_WebApi) {
                    // Get the REST client
                    var witClient = VSS_Service.getCollectionClient(TFS_Wit_WebApi.WorkItemTrackingHttpClient);

                    // Obtain, calculate and present the items to the user
                    witClient.getWorkItems(workitemidlist, null, null, 0).then(
                        function (workItems) {
                            debugger;
                            let calculations = new WorkItemCalculations(workItems);
                            alert(calculations.getWorkItemsResults());
                        });
                });
            }
        }];
    }
};

// Register context menu action provider
VSS.register(VSS.getContribution().id, actionProvider);