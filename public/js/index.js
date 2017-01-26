"use strict";

var socket = io.connect('http://localhost:3000', { 'force new connection': true });

Vue.component('document-admin', {
    template: `<div>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Document type</th>
                            <th>%</th>
                            <th>Avancement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="doc in allDoc">
                            <td>{{doc.id}}</td>
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
            if (data.length <= 0) {
                socket.emit('getDocument');
            }
            this.allDoc = data;
        });
    }
});

new Vue({
    el: '#app'
});