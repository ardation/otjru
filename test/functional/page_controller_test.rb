require 'test_helper'

class PageControllerTest < ActionController::TestCase
  test "should get step1" do
    get :step1
    assert_response :success
  end

  test "should get step2" do
    get :step2
    assert_response :success
  end

  test "should get step3" do
    get :step3
    assert_response :success
  end

  test "should get step4" do
    get :step4
    assert_response :success
  end

  test "should get step5" do
    get :step5
    assert_response :success
  end

  test "should get step6" do
    get :step6
    assert_response :success
  end

  test "should get step7" do
    get :step7
    assert_response :success
  end

  test "should get step8" do
    get :step8
    assert_response :success
  end

  test "should get data" do
    get :data
    assert_response :success
  end

  test "should get kennedy" do
    get :kennedy
    assert_response :success
  end

end
