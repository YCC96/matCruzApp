const app = express();

app.use(express.static(__dirname+'/dist/matCruzApp'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/matCruzApp/index.html'));
});

app.listen(process.env.PORT || 8080);
