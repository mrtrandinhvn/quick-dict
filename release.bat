if exist "release" rd "release" /s /q
del "release.zip"
mkdir "release"
xcopy src release\src\ /e /y
xcopy built release\built\ /e /y
xcopy icons release\icons\ /e /y
xcopy resources release\resources\ /e /y
echo f | xcopy manifest.json release\manifest.json /y

cd release
del /s "**.dummy.js**"
del /s "**.map**"
del /s "**.ts**"
del /s "**.scss**"

cd ../