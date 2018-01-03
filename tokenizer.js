#!/usr/bin/env nodejs
var sync = require('synchronize');
var moment = require('moment');
var pythonShell = require('python-shell');
var dateFormat = require('dateformat');

// Synchronize - 한 시점에 한 번만 사용하기 위함
pythonShell.run = sync(pythonShell.run);

sync.fiber(function()
{	
	// 이곳에 Token화하기 위한 본문이 들어간다.
	var inputText = '....'

	pyresult = sync.await(pythonShell.run('tokenizer_twitter.py', 
		{args:[new Buffer(inputText).toString('base64')]},sync.defer()));

	var tokenDict = {};	//Dictionary Object로 이용
	try {
		//받은 결과물을 JSON 객체로 변환
		tokens = JSON.parse(pyresult); 	//JSON.Stringify 반대로 JSON을 문자열로 만드는 함수
		console.log("Token count", tokens.length)

		for(j=0;j<tokens.length;j++)
		{
			var key = tokens[j];
			if(tokenDict[key] === undefined )
			{
				tokenDict[key] = 1;
			}
			else
			{
				tokenDict[key] = tokenDict[key] + 1;
    		}
		}
		console.log("TokenDict Count", Object.keys(tokenDict).length);
	} 
	catch (e) 
	{
		//이 위치에서 sync.fiber에서 시행되는 모든 Synchronized 함수에서 발생하는 에러 처리
		console.log(e);
	}
	process.exit();
});