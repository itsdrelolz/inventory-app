const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const formatActiveStatus = (status) => {
    return status ? 'Active' : 'Inactive';
};

module.exports = {
    formatDate,
    formatActiveStatus
};