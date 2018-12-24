/*****************
 * Database Models
 ******************/


class DbHelper {
    constructor(collection) {
        this.collection = collection;
    }

    // Find All Records
    find_query(filter = {}, project = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.collection.find(filter, project).exec();
                return resolve(response);
            } catch (err) {
                return reject(err);
            }
        })
    }

    // Find Single Records
    findOne(filter = {}, project = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.collection.findOne(filter, project).exec();
                return resolve(response);
            } catch (err) {
                return reject(err);
            }
        })
    }

    // Update Data
    update(filter, update_result, upsrt = false, multiple = false) {

        return new Promise(async (resolve, reject) => {

            try {
                const response = await this.collection.update(filter, update_result, {upsert: upsrt, multi: multiple});
                return resolve(response);
            } catch (err) {
                return reject(err);
            }

        });

    }

    // Aggregate Query to find all records
    aggregate_query(pipeline) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.collection.aggregate(pipeline).allowDiskUse(true);
                return resolve({data: response, err: null});
            } catch (err) {
                return reject(err);
            }
        });
    }

    // Aggregate Query to find all count
    aggregate_with_count(pipeline) {
        pipeline.push({'$count': 'count'});
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.collection.aggregate(pipeline).allowDiskUse(true);
                return resolve(response);
            } catch (err) {
                return reject(err);
            }
        });
    }

    find_with_limit_sort(filter = {}, project = {}, sort, limit) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.collection.find(filter, project).sort(sort).limit(limit).exec();
                return resolve(response);
            } catch (err) {
                return reject(err);
            }
        })
    }

    find_one_and_update(filter, update_result) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.collection.findOneAndUpdate(filter, update_result, {
                    upsert: true,
                    new: true
                });
                return resolve(response);
            } catch (err) {
                return reject(err);
            }
        });
    }

    insert_Many(records) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.collection.insertMany(records);
                return resolve(response);
            } catch (err) {
                return reject(err);
            }
        });
    }

    find_distinct(select_key, filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.collection.distinct(select_key, filter);
                return resolve(response);
            } catch (err) {
                return reject(err);
            }
        });
    }


}

module.exports = DbHelper;