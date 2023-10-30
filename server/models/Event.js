
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    image: {
        type: String,
        default: "https://cdn.create.vista.com/api/media/small/13346688/stock-vector-halloween-party-greeting-card"
    },
    banner: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/019/605/513/large_2x/blue-purple-golden-royal-awards-graphics-background-center-round-circle-ring-elegant-shine-modern-template-luxury-premium-corporate-template-abstract-certificate-banner-dynamic-crystal-design-vector.jpg"
    },
    usersRegistered: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
