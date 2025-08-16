export default function HomePage() {
            return (
                <div className="bg-gray-100 font-sans">
                    {/* Header */}
                    <header className="bg-white-600 text-white py-6">
                        <div className="container mx-auto text-center">
                            <h1 className="text-3xl font-semibold text-center text-gray-800">Dự án Dự đoán Tỷ lệ Khách hàng Rời bỏ</h1>
                            <p className="mt-4 text-gray-600 text-center max-w-2xl mx-auto">Sử dụng AI để dự đoán và giữ chân khách hàng</p>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="container mx-auto py-12 px-4">
                        {/* About Section */}
                        <section className="mb-12">
                            <h2 className="text-3xl font-semibold text-center text-gray-800">Giới thiệu Dự án</h2>
                            <p className="mt-4 text-gray-600 text-center max-w-2xl mx-auto">
                                Dự án này sử dụng các mô hình học máy để phân tích dữ liệu khách hàng và dự đoán khả năng họ rời bỏ dịch vụ. 
                                Với các thuật toán tiên tiến, chúng tôi giúp doanh nghiệp tối ưu hóa chiến lược giữ chân khách hàng.
                            </p>
                        </section>

                        {/* Features Section */}
                        <section className="mb-12">
                            <h2 className="text-3xl font-semibold text-center text-gray-800">Tính năng Chính</h2>
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-xl font-bold text-gray-800">Dự đoán Chính xác</h3>
                                    <p className="mt-2 text-gray-600">Sử dụng mô hình học máy để dự đoán tỷ lệ rời bỏ với độ chính xác cao.</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-xl font-bold text-gray-800">Phân tích Dữ liệu</h3>
                                    <p className="mt-2 text-gray-600">Phân tích dữ liệu khách hàng để tìm ra các yếu tố ảnh hưởng đến quyết định rời bỏ.</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-xl font-bold text-gray-800">Giao diện Thân thiện</h3>
                                    <p className="mt-2 text-gray-600">Cung cấp dashboard dễ sử dụng để theo dõi và quản lý dữ liệu.</p>
                                </div>
                            </div>
                        </section>

                        {/* Call to Action */}
                        <section className="text-center">
                            <h2 className="text-3xl font-semibold text-gray-800">Bắt đầu ngay hôm nay!</h2>
                            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
                                Tham gia dự án của chúng tôi để tối ưu hóa chiến lược kinh doanh và giữ chân khách hàng hiệu quả hơn.
                            </p>
                            <a href="/contact" className="mt-6 inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition">
                                Liên hệ với chúng tôi
                            </a>
                        </section>
                    </main>
                </div>
            );
        }