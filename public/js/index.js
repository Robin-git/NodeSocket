"use strict";

var socket = io.connect('http://localhost:3000');

Vue.component('document-admin', {
    template: `<div>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Avancement</th>
                            <th>Statue</th>
                            <th>Document type</th>
                            <th>%</th>
                            <th>Avancement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="doc in allDoc" v-bind:class="{ danger: doc.status == 'Error', success: doc.loader == 100 && doc.status == 'Valide' }">
                            <td>{{doc.id}}</td>
                            <td>{{doc.etape}}</td>
                            <td>{{doc.status}}</td>
                            <td>{{doc.document}}</td>
                            <td>{{doc.loader}}%</td>
                            <td>
                                <div class="progress progress-striped active">
                                    <div class="progress-bar" v-bind:style="{ width: doc.loader + '%' }"></div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>`,
    data: function () {
        return {
            allDoc: []
        }
    },
    created: function () {
        socket.on('loadPush', (data) => {
            this.allDoc = data;
        });
    }
});

new Vue({
    el: '#app'
});