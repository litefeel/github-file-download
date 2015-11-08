// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log("changeInfo.status=%s", changeInfo.status);
  if (changeInfo.status !== 'loading') return;

  // https://github.com/username/reponame
  // https://github.com/username/reponame/tree/xxxx
  // https://github.com/username/reponame/find/xxxx
  // https://github.com/username/reponame/blob/xxxx
  // https://gist.github.com/username/xxxx
  if (!tab.url.match(/https:\/\/github\.com\/[^\/]+\/[^\/]+(\/?$|\/blob\/.+|\/tree\/.+|\/find\/.+)/) &&
      !tab.url.match(/https:\/\/gist\.github\.com\/[^\/]+\/.+/)) {
    return;
  }

  chrome.tabs.executeScript(tabId, {
    code  : 'gfd_onLocalChange();',
    runAt : 'document_end'
  }, function(res) {
    
  });
    
})
