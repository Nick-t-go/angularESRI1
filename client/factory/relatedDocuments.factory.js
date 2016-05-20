app.factory('RelatedDocuments', function(esriLoader, $q) {
    return {
        findRelated: function(id, parentLayer){
            var relationshipStore = {};
            var promises = [];

            return $q(function(resolve, reject) {
                esriLoader.require(["esri/tasks/RelationshipQuery"], function(RelationshipQuery) {
                    parentLayer.relationships.forEach(function(relationship) {
                        var promise = $q(function(resolve, reject) {
                            var relatedQuery = new RelationshipQuery();
                            relatedQuery.outFields = ['*'];
                            relatedQuery.relationshipId = relationship.id;
                            relatedQuery.objectIds = [id];

                            parentLayer.queryRelatedFeatures(relatedQuery, function(relatedRecords) {
                                if (Object.keys(relatedRecords).length) {
                                    var idx = relationship.name.indexOf('DBO.tbl');
                                    var relName = relationship.name.slice(idx + tblIdxOptions[activeLocation]);

                                    relationshipStore[relName] = relatedRecords;
                                }
                                resolve();
                            });
                        });

                        promises.push(promise);
                    });
                    $q.all(promises)
                        .then(function() {
                            resolve(relationshipStore);
                        });
                });//esriLoader
            });
        } //findRelated
		
	} //first return
    
});
