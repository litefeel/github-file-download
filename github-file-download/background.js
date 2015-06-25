// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log("changeInfo.status=%s", changeInfo.status);
  if (changeInfo.status !== 'loading') return;

  // https://github.com/username/reponame/blob/xxxx
  // https://gist.github.com/username/xxxx
  if (!tab.url.match(/https:\/\/github\.com\/[^\/]+\/[^\/]+\/blob\/.+/) &&
      !tab.url.match(/https:\/\/gist\.github\.com\/[^\/]+\/.+/)) {
    return;
  }

  chrome.tabs.executeScript(tabId, {
    code  : 'if (gfd_onLocalChange){gfd_onLocalChange();};',
    runAt : 'document_start'
  }, function(res) {
    // if (chrome.runtime.lastError) {
    //   console.log("lastError=%", chrome.runtime.lastError.message)
    // }
    // console.log("lastError=%s", chrome.runtime.lastError)
    // if (res) {
    //   console.log('res=%s', res[0]);
    // }
    // console.debug("res[0]=%s", res[0])
    if (chrome.runtime.lastError || // don't continue if error (i.e. page isn't in permission list)
        res[0]) // value of `injected` above: don't inject twice
      return

    // chrome.tabs.executeScript(tabId, {file:'download-button.js',runAt:'document_start'});

    var jsFiles = [
      'jquery.min.js',
      'download-button.js'
    ];

    eachTask([
      function(cb) {
        eachItem(jsFiles, inject('executeScript'), cb)
      }
    ])

    function inject(fn) {
      return function(file, cb) {
        chrome.tabs[fn](tabId, { file: file, runAt: 'document_start' }, cb)
      }
    }
  })
})

function eachTask(tasks, done) {
  next(0)
  function next(index) {
    if (index === tasks.length) done && done()
    else tasks[index](function() { next(index + 1) })
  }
}

function eachItem(arr, iter, done) {
  var tasks = arr.map(function(item) {
    return function(next) {
      iter(item, next)
    }
  })
  return eachTask(tasks, done)
}
