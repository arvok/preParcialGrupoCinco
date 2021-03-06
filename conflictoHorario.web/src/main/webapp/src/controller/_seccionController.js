/* ========================================================================
 * Copyright 2014 preparcialgrupocinco
 *
 * Licensed under the MIT, The MIT License (MIT)
 * Copyright (c) 2014 preparcialgrupocinco

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 * ========================================================================


Source generated by CrudMaker version 1.0.0.201408112050

*/
define(['model/seccionModel'], function(seccionModel) {
    App.Controller._SeccionController = Backbone.View.extend({
        initialize: function(options) {
            this.modelClass = options.modelClass;
            this.listModelClass = options.listModelClass;
            this.showEdit = true;
            this.showDelete = true;
            this.editTemplate = _.template($('#seccion').html());
            this.listTemplate = _.template($('#seccionList').html());
            if (!options || !options.componentId) {
                this.componentId = _.random(0, 100) + "";
            }else{
				this.componentId = options.componentId;
		    }
            var self = this;
            if(self.postInit){
            	self.postInit(options);
            }
        },
        create: function() {
            if (App.Utils.eventExists(this.componentId + '-' +'instead-seccion-create')) {
                Backbone.trigger(this.componentId + '-' + 'instead-seccion-create', {view: this});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-seccion-create', {view: this});
                this.currentSeccionModel = new this.modelClass({componentId: this.componentId});
                this._renderEdit();
                Backbone.trigger(this.componentId + '-' + 'post-seccion-create', {view: this});
            }
        },
        list: function(params) {
            if (params) {
                var data = params.data;
            }
            if (App.Utils.eventExists(this.componentId + '-' +'instead-seccion-list')) {
                Backbone.trigger(this.componentId + '-' + 'instead-seccion-list', {view: this, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-seccion-list', {view: this, data: data});
                var self = this;
				if(!this.seccionModelList){
                 this.seccionModelList = new this.listModelClass();
				}
                this.seccionModelList.fetch({
                    data: data,
                    success: function() {
                        self._renderList();
                        Backbone.trigger(self.componentId + '-' + 'post-seccion-list', {view: self});
                    },
                    error: function(mode, error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'seccion-list', view: self, error: error});
                    }
                });
            }
        },
        edit: function(params) {
            var id = params.id;
            var data = params.data;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-seccion-edit')) {
                Backbone.trigger(this.componentId + '-' + 'instead-seccion-edit', {view: this, id: id, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-seccion-edit', {view: this, id: id, data: data});
                if (this.seccionModelList) {
                    this.currentSeccionModel = this.seccionModelList.get(id);
                    this.currentSeccionModel.set('componentId',this.componentId); 
                    this._renderEdit();
                    Backbone.trigger(this.componentId + '-' + 'post-seccion-edit', {view: this, id: id, data: data});
                } else {
                    var self = this;
                    this.currentSeccionModel = new this.modelClass({id: id});
                    this.currentSeccionModel.fetch({
                        data: data,
                        success: function() {
                            self.currentSeccionModel.set('componentId',self.componentId); 
                            self._renderEdit();
                            Backbone.trigger(self.componentId + '-' + 'post-seccion-edit', {view: this, id: id, data: data});
                        },
                        error: function() {
                            Backbone.trigger(self.componentId + '-' + 'error', {event: 'seccion-edit', view: self, id: id, data: data, error: error});
                        }
                    });
                }
            }
        },
        destroy: function(params) {
            var id = params.id;
            var self = this;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-seccion-delete')) {
                Backbone.trigger(this.componentId + '-' + 'instead-seccion-delete', {view: this, id: id});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-seccion-delete', {view: this, id: id});
                var deleteModel;
                if (this.seccionModelList) {
                    deleteModel = this.seccionModelList.get(id);
                } else {
                    deleteModel = new this.modelClass({id: id});
                }
                deleteModel.destroy({
                    success: function() {
                        Backbone.trigger(self.componentId + '-' + 'post-seccion-delete', {view: self, model: deleteModel});
                    },
                    error: function() {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'seccion-delete', view: self, error: error});
                    }
                });
            }
        },
		_loadRequiredComponentsData: function(callBack) {
            var self = this;
            var listReady = _.after(3, function(){
                callBack();
            }); 
            var listDataReady = function(componentName, model, aliasModel){
            if(aliasModel){
                self[aliasModel] = model;
            } else {
            	self[componentName] = model;
            }    
                listReady();
            };
				App.Utils.getComponentList('profesorComponent',listDataReady,'profesor_seccionComponent');
				App.Utils.getComponentList('estudianteComponent',listDataReady,'enEspera_seccionComponent');
				App.Utils.getComponentList('estudianteComponent',listDataReady,'inscritos_seccionComponent');
        },
        save: function() {
            var self = this;
            var model = $('#' + this.componentId + '-seccionForm').serializeObject();
            if (App.Utils.eventExists(this.componentId + '-' +'instead-seccion-save')) {
                Backbone.trigger(this.componentId + '-' + 'instead-seccion-save', {view: this, model : model});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-seccion-save', {view: this, model : model});
                this.currentSeccionModel.set(model);
                this.currentSeccionModel.save({},
                        {
                            success: function(model) {
                                Backbone.trigger(self.componentId + '-' + 'post-seccion-save', {model: self.currentSeccionModel});
                            },
                            error: function(error) {
                                Backbone.trigger(self.componentId + '-' + 'error', {event: 'seccion-save', view: self, error: error});
                            }
                        });
            }
        },
        _renderList: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.listTemplate({seccions: self.seccionModelList.models, componentId: self.componentId, showEdit : self.showEdit , showDelete : self.showDelete}));
                self.$el.slideDown("fast");
            });
        },
        _renderEdit: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.editTemplate({seccion: self.currentSeccionModel, componentId: self.componentId , showEdit : self.showEdit , showDelete : self.showDelete
 
				    ,profesor_seccion: self.profesor_seccionComponent
 
				    ,enEspera_seccion: self.enEspera_seccionComponent
 
				    ,inscritos_seccion: self.inscritos_seccionComponent
 
				}));
                self.$el.slideDown("fast");
            });
        }
    });
    return App.Controller._SeccionController;
});